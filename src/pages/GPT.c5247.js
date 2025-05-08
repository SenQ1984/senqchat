import { getGPTReply } from 'backend/gpt';
import wixWindow from 'wix-window';

$w.onReady(function () {
  setTimeout(() => {
    if (typeof window !== "undefined") {
      console.log("🧠 Listening for iframe messages...");

      window.addEventListener("message", async (event) => {
        if (event.origin !== "https://www-senq-ai.filesusr.com") return;
        if (event.data?.type !== "senq-message") return;

        const userMessage = event.data.content;

        try {
          const reply = await getGPTReply(userMessage);
          $w("#chatBox").postMessage({
            type: "senq-response",
            content: reply
          });
        } catch (err) {
          $w("#chatBox").postMessage({
            type: "senq-response",
            content: "⚠️ SenQ is offline. Try again later."
          });
        }
      });
    }
  }, 500);
});
