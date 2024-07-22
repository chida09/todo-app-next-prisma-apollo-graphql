import { prisma } from "@/lib/prisma";

export default async function Home() {
  const todoList = await prisma.task.findMany();

  return (
    <div>
      <h2>Todo一覧</h2>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
