import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function runTest() {
  console.log("🚀 Starting Auth Flow Test against Database...");
  const testEmail = `test_${Date.now()}@example.com`;
  const testPassword = "SuperSecretPassword123!";

  console.log(`\n1. Testing Sign Up for: ${testEmail}`);
  try {
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        password: hashedPassword,
        name: "Test User",
      }
    });
    console.log("✅ Sign Up Successful! User saved in PostgreSQL database:");
    console.log({ id: user.id, email: user.email, name: user.name, createdAt: user.createdAt });
  } catch (err) {
    console.error("❌ Sign Up Failed:", err);
    return;
  }

  console.log(`\n2. Testing Sign In for: ${testEmail}`);
  try {
    const user = await prisma.user.findUnique({ where: { email: testEmail } });
    if (!user) throw new Error("User not found!");
    
    const isMatch = await bcrypt.compare(testPassword, user.password);
    if (isMatch) {
      console.log("✅ Sign In Successful! Password matches hashed database password.");
    } else {
      console.error("❌ Sign In Failed! Password mismatch.");
    }
  } catch (err) {
    console.error("❌ Sign In Failed:", err);
  } finally {
    await prisma.$disconnect();
    console.log("\n🏁 Test Completed.");
  }
}

runTest();
