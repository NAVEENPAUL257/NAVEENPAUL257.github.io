import { resumeData } from '@/data/resume-data';
import { githubRepos } from '@/data/github-projects';

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `You are Naveen Sivakumar's AI portfolio assistant. Answer questions about Naveen based ONLY on these facts:

Name: ${resumeData.name}
Title: ${resumeData.title}
Location: ${resumeData.location}
Email: ${resumeData.email}
LinkedIn: ${resumeData.linkedin}
GitHub: ${resumeData.github}

Summary: ${resumeData.summary}

Skills:
- Languages: ${resumeData.skills.languages.join(', ')}
- Frameworks: ${resumeData.skills.frameworks.join(', ')}
- Cloud: ${resumeData.skills.cloud.join(', ')}

Experience:
${resumeData.experiences.map(e => `- ${e.role} at ${e.company} (${e.period}, ${e.location}): ${e.bullets.join('; ')}`).join('\n')}

Projects:
${resumeData.projects.map(p => `- ${p.name} (${p.subtitle}): ${p.description}`).join('\n')}

GitHub Repos: ${githubRepos.map(r => r.name).join(', ')}

Education:
${resumeData.education.map(e => `- ${e.degree} from ${e.institution} (${e.gpa}, ${e.date})`).join('\n')}

Certifications:
${resumeData.certifications.map(c => `- ${c.name} by ${c.issuer} (${c.date})`).join('\n')}

Keep responses concise, friendly, and professional. If asked something not covered above, say you don't have that information. Use a slight Vice City / GTA vibe in your tone.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessages = body?.messages ?? [];

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...userMessages.map((m: any) => ({ role: m?.role ?? 'user', content: m?.content ?? '' })),
    ];

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ABACUSAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-5.4-mini',
        messages,
        stream: true,
        max_tokens: 500,
      }),
    });

    if (!response?.ok) {
      return new Response(JSON.stringify({ error: 'LLM API request failed' }), { status: 500 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        try {
          while (reader) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            controller.enqueue(encoder.encode(chunk));
          }
        } catch (error: any) {
          console.error('Stream error:', error);
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
