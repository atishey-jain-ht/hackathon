import express from 'express';
import axios from 'axios';
import { processH1 } from './generateImg.js';

const router = express.Router();

// API to fetch a URL
router.post('/create-stories', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Fetch the data from the URL
    const response = await processH1(url);
    console.log("🚀 ~ router.post ~ response:", response)

    // Send back the response from the URL
    res.status(200).json({
      status: 'success',
      data: response,
    });
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error)
    // Handle errors
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

export default router;
