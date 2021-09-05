import Navigation from "../containers/Navigation";

interface Props {
  children: React.ReactNode;
}

const Page = ({ children }: Props) => (
  <div className="page">
    <header className="page__head">
      <Navigation />
    </header>
    <main className="page__content container">{children}</main>
  </div>
);

export default Page;
