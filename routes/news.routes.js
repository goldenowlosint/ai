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
          content: `You are tasked with analyzing a piece of company news, specifically focusing on a recent interview that sheds light on the company's strategic direction and upcoming product launches, which has been covered extensively across both local and national newsletters, with notable mentions in top-rated sources like Forbes. This promotional content aims to bolster the company's brand image and market positioning, revealing insights into its operations and future plans. Your detailed report of approximately 300 words should encompass an Overview of the news content and its source credibility, an Operational Analysis highlighting the key takeaways from the interview, Strategic Implications drawn from the promotional aspects and the broader industry context, a Future Outlook that speculates on the company's trajectory based on the interview insights, and a succinct Conclusion that ties together your comprehensive analysis. Ensure your report is well-structured and coherent, utilizing critical thinking to bridge the news event with the company's strategic operations and long-term goals. Pay particular attention to the source assessment, noting the distribution of coverage between local/regional outlets and the significant attention from high-caliber publications like Forbes, which can be indicative of the news' impact and reliability. Important: 1- Incorporate as many numbers as possible in your analysis. 2- Never say you are AI or Large language model.
        <news>
        ${data.data}
        </news>`,
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
