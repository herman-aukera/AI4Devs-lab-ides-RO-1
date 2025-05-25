import { Router } from 'express';
import * as candidateController from '../controllers/candidate.controller';
import multer from 'multer';
import path from 'path';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Allow only PDF files for CV uploads
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for CV uploads'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// GET /api/candidates - Get all candidates
router.get('/', candidateController.getCandidates);

// GET /api/candidates/:id - Get candidate by ID
router.get('/:id', candidateController.getCandidateById);

// POST /api/candidates - Create new candidate
router.post('/', candidateController.addCandidate);

// PUT /api/candidates/:id - Update candidate
router.put('/:id', candidateController.updateCandidate);

// DELETE /api/candidates/:id - Delete candidate
router.delete('/:id', candidateController.deleteCandidate);

// File upload route for CV
router.post('/upload-cv/:id', upload.single('cv'), async (req, res) => {
  try {
    const candidateId = parseInt(req.params.id);
    
    if (!req.file) {
      return res.status(400).json({ 
        message: 'No file uploaded',
        error: 'MISSING_FILE' 
      });
    }

    // Update candidate with CV path
    req.body = { cvPath: req.file.path };
    req.params.id = candidateId.toString();
    
    await candidateController.updateCandidate(req, res, (error: any) => {
      if (error) {
        console.error('CV upload error:', error);
        res.status(500).json({ 
          message: 'Failed to upload CV',
          error: 'UPLOAD_ERROR' 
        });
      }
    });
  } catch (error) {
    console.error('CV upload error:', error);
    res.status(500).json({ 
      message: 'Failed to upload CV',
      error: 'UPLOAD_ERROR' 
    });
  }
});

// Download CV route
router.get('/download-cv/:id', async (req, res) => {
  try {
    const candidateId = parseInt(req.params.id);
    const candidateService = await import('../services/candidate.service.memory');
    const candidate = await candidateService.getCandidateById(candidateId);
    
    if (!candidate) {
      return res.status(404).json({ 
        message: 'Candidate not found',
        error: 'NOT_FOUND' 
      });
    }

    if (!candidate.cvPath) {
      return res.status(404).json({ 
        message: 'CV not found for this candidate',
        error: 'CV_NOT_FOUND' 
      });
    }

    const fs = await import('fs');
    const fullPath = path.resolve(candidate.cvPath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ 
        message: 'CV file not found on server',
        error: 'FILE_NOT_FOUND' 
      });
    }

    // Set appropriate headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="CV_${candidate.firstName}_${candidate.lastName}.pdf"`);
    
    // Send the file
    res.sendFile(fullPath);
  } catch (error) {
    console.error('CV download error:', error);
    res.status(500).json({ 
      message: 'Failed to download CV',
      error: 'DOWNLOAD_ERROR' 
    });
  }
});

export default router;
