import { Title } from "../../components/Title";

export default {
  component: Title,
  title: "Example/Title",
};

export const Primary = () => <Title title="Hello world" />;
export const WithSubtitle = () => (
  <Title title="Hello world" subtitle="with love ❤️" />
);
