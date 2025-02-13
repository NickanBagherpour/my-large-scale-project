export async function GET(request) {
  try {

    console.log('helooooooooooooooooooooooooooooooooooooooooooooooooo get',request);
    const { url, method, headers, body } = await request.json();
    console.log('helooooooooooooooooooooooooooooooooooooooooooooooooo get',url , method , headers , body);

    // Handle the sandbox request logic here
    // You can pass or fetch data as required, e.g., from a mock database or external API

    // Example response
    return new Response(JSON.stringify({ message: 'Sandbox request successful!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Something went wrong!' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  try {


    console.log('helooooooooooooooooooooooooooooooooooooooooooooooooo delete', request);

    // Handle the sandbox request logic here
    // You can pass or fetch data as required, e.g., from a mock database or external API

    // Example response
    return new Response(JSON.stringify({ message: 'Sandbox request successful!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Something went wrong!' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}



export async function POST(request) {
  try {


    console.log('helooooooooooooooooooooooooooooooooooooooooooooooooo post', request);

    // Handle the sandbox request logic here
    // You can pass or fetch data as required, e.g., from a mock database or external API

    // Example response
    return new Response(JSON.stringify({ message: 'Sandbox request successful!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Something went wrong!' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
