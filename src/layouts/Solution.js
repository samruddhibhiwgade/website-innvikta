import SolutionHero from "@layouts/components/SolutionHero";

const Solution = ({ data }) => {
  const { frontmatter } = data;
  const { hero } = frontmatter;

  return (
    <>
      {hero && <SolutionHero hero={hero} />}
      {/* Subsequent sections will be added here */}
    </>
  );
};

export default Solution;
