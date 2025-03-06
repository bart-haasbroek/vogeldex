export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const USERNAME = process.env.USERNAME;
    const PASSWORD = process.env.PASSWORD;

    const body = JSON.parse(event.body);
    const { email, password } = body;

    if (email !== USERNAME || password !== PASSWORD) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Ongeldige inloggegevens" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        user: {
          email: USERNAME,
          role: "admin"
        }
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
