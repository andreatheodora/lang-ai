import { BASE_URL } from "@/app/constants";
export async function chat(input, language, level, words = [], grammars = []) {
  console.log("input:");
  console.log(input);
  const url = BASE_URL;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: input,
        language: language,
        level: level,
        words: words,
        grammars: grammars,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Failed to chat with status: ${response.status}`
      );
    }

    return data.message;
  } catch (err) {
    console.error("Error calling API: ", err.message);
    throw err;
  }
}

export async function vocab(input, language, level, deck) {
  const url = `${process.env.BASE_URL}/api/vocab/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: input,
        language: language,
        level: level,
        deck: deck,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Failed to chat with status: ${response.status}`
      );
    }
  } catch (err) {
    console.error("Error calling API: ", err.message);
    throw err;
  }
}

export async function grammar(input, language, level, grammar) {
  const url = `${process.env.BASE_URL}/api/grammar/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: input,
        language: language,
        level: level,
        grammar: grammar,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Failed to chat with status: ${response.status}`
      );
    }
  } catch (err) {
    console.error("Error calling API: ", err.message);
    throw err;
  }
}
