export default function List({ courses, children }) {
  return (
    <section className="mb-5 grid gap-4 md:grid-cols-1 lg:grid-cols-2">
      {courses.map((course) => children(course))}
    </section>
  );
}
