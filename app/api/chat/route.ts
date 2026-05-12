type ChatRole = "user" | "assistant";

type IncomingMessage = {
  role: ChatRole;
  content: string;
};

type ChatRequestBody = {
  system?: string;
  messages?: IncomingMessage[];
};

type DeepSeekChoice = {
  message?: {
    content?: string;
  };
};

type DeepSeekResponse = {
  choices?: DeepSeekChoice[];
  error?: {
    message?: string;
  };
};

export const runtime = "nodejs";

export async function POST(request: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const model = process.env.DEEPSEEK_MODEL ?? "deepseek-chat";

  if (!apiKey) {
    return Response.json(
      { error: "Falta configurar DEEPSEEK_API_KEY en el servidor." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as ChatRequestBody;
  const userMessages = body.messages?.filter(
    (message): message is IncomingMessage =>
      (message.role === "user" || message.role === "assistant") &&
      typeof message.content === "string" &&
      message.content.trim().length > 0,
  );

  if (!userMessages?.length) {
    return Response.json({ error: "No se recibieron mensajes validos." }, { status: 400 });
  }

  const messages = body.system
    ? [{ role: "system", content: body.system }, ...userMessages]
    : userMessages;

  const deepseekResponse = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 700,
      messages,
    }),
  });

  const data = (await deepseekResponse.json()) as DeepSeekResponse;

  if (!deepseekResponse.ok) {
    return Response.json(
      { error: data.error?.message ?? "Error al consultar DeepSeek." },
      { status: deepseekResponse.status },
    );
  }

  const content =
    data.choices?.[0]?.message?.content ??
    "Lo siento, no pude procesar tu pregunta. Intenta de nuevo.";

  return Response.json({ content });
}
