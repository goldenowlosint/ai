import express from "express";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey: "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",
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // Ensure the data contains the required field
    if (!data) {
      // Respond with a 400 Bad Request if the required field is not present or is not a string
      return res.status(400).json({
        error:
          'Invalid request data. Please provide a string in the "data" field.',
      });
    }

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `You are tasked with conducting an in-depth analysis of a company's social media presence, specifically focusing on their posts and tweets. Your objective is to scrutinize the content meticulously, evaluating the authenticity and factual accuracy of their social media activity. Consider the engagement metrics, such as likes, and how they might correlate with the credibility of the information presented. In your analysis, please address the following Overview of the company's social media strategy, Authenticity assessment, Engagement analysis. Important: 1- Incorporate as many numbers as possible in your analysis. 2- Never say you are AI or Large language model.
        <contents>
        ${data.data}
        </contents>`,
        },
      ],
      model: "gpt-4",
    });

    console.log(chatCompletion);

    // Check if the chatCompletion has the expected structure
    if (
      !chatCompletion.choices ||
      chatCompletion.choices.length === 0 ||
      !chatCompletion.choices[0].message
    ) {
      // Respond with a 500 Internal Server Error if the response structure is not as expected
      return res
        .status(500)
        .json({ error: "Unexpected response structure from OpenAI API." });
    }

    res.send(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("Error during API call to OpenAI:", error);

    // Respond with a 500 Internal Server Error if an exception occurs
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

export default router;
