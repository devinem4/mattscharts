export function Title({ title, subtitle }) {
  return (
    <>
      <h1>title is {title}</h1>
      {subtitle && <h3>subtitle is {subtitle}</h3>}
    </>
  );
}
