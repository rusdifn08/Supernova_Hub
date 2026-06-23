import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const additionalCourses = [
  {
    title: "AI Engineer Agentic Track: The Complete Agent & MCP Course",
    description: "Learn how to build autonomous agents, multi-agent systems, and integrate with the Model Context Protocol (MCP).",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop",
    totalDuration: "24h 15m"
  },
  {
    title: "The AI Engineer Course 2026",
    description: "The ultimate guide to AI Engineering for the modern era. Master the latest techniques and models.",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop",
    totalDuration: "40h 0m"
  },
  {
    title: "AI for Accounting Professionals",
    description: "Automate your accounting workflows, build custom AI tools, and modernize your financial analysis.",
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
    totalDuration: "12h 30m"
  },
  {
    title: "Physics for Beginners",
    description: "A comprehensive introduction to the fundamentals of physics. Learn mechanics, thermodynamics, and electromagnetism.",
    thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=600&auto=format&fit=crop",
    totalDuration: "18h 45m"
  },
  {
    title: "Quantum Physics from Beginner to Expert",
    description: "Dive deep into the quantum realm. Understand wave-particle duality, quantum entanglement, and quantum computing.",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
    totalDuration: "35h 20m"
  }
];

function generateGenericMarkdown(title: string, duration: string, orderIndex: number) {
  return `# ${title}

## Module Content

Welcome to **${title}**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: ${duration}
- Module index: ${orderIndex}

Please refer to the course video or external resources for the full lecture content.
`;
}

async function main() {
  for (const courseData of additionalCourses) {
    let course = await prisma.course.findFirst({
      where: { title: courseData.title }
    });

    if (!course) {
      course = await prisma.course.create({
        data: {
          title: courseData.title,
          description: courseData.description,
          thumbnail: courseData.thumbnail,
          totalDuration: courseData.totalDuration
        }
      });
      console.log('Created Course:', course.title);

      // Create 5 dummy modules for each course
      for (let i = 1; i <= 5; i++) {
        await prisma.courseModule.create({
          data: {
            courseId: course.id,
            title: `Module ${i}: Introduction to ${course.title.split(' ')[0]}`,
            duration: "45m",
            orderIndex: i,
            contentMd: generateGenericMarkdown(`Module ${i}`, "45m", i)
          }
        });
      }
      console.log(`Created 5 modules for ${course.title}`);
    } else {
      console.log('Course already exists:', course.title);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
