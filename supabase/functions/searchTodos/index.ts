import "jsr:@supabase/functions-js/edge-runtime.d.ts";

interface reqPayload {
  name: string;
}

Deno.serve(async (req: Request) => {
  const { name }: reqPayload = await req.json();
  return new Response(
    JSON.stringify({ message: `Hello ${name}!` }),
    { headers: { "Content-Type": "application/json" } }
  );
});
