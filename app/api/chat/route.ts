type ChatRole = "user" | "assistant";

type IncomingMessage = {
  role: ChatRole;
  content: string;
};

type ChatRequestBody = {
  system?: string;
  messages?: IncomingMessage[];
};

type AnthropicTextBlock = {
  type: "text";
  text: string;
};

type AnthropicContentBlock = AnthropicTextBlock | { type: string };

type AnthropicResponse = {
  content?: AnthropicContentBlock[];
  error?: {
    message?: string;
  };
};

export const runtime = "nodejs";

function isTextBlock(block: AnthropicContentBlock): block is AnthropicTextBlock {
  return block.type === "text" && "text" in block && typeof block.text === "string";
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";

  if (!apiKey) {
    return Response.json(
      { error: "Falta configurar ANTHROPIC_API_KEY en el servidor." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as ChatRequestBody;
  const messages = body.messages?.filter(
    (message): message is IncomingMessage =>
      (message.role === "user" || message.role === "assistant") &&
      typeof message.content === "string" &&
      message.content.trim().length > 0,
  );

  if (!messages?.length) {
    return Response.json({ error: "No se recibieron mensajes validos." }, { status: 400 });
  }

  const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "anthropic-version": "2023-06-01",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      model,
      max_tokens: 700,
      system: body.system,
      messages,
    }),
  });

  const data = (await anthropicResponse.json()) as AnthropicResponse;

  if (!anthropicResponse.ok) {
    return Response.json(
      { error: data.error?.message ?? "Error al consultar Anthropic." },
      { status: anthropicResponse.status },
    );
  }

  const content =
    data.content?.find(isTextBlock)?.text ??
    "Lo siento, no pude procesar tu pregunta. Intenta de nuevo.";

  return Response.json({ content });
}
