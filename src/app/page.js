import Cta from "@layouts/components/Cta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";

import HomeBanner from "@layouts/partials/HomeBanner";
import Challenges from "@layouts/partials/Challenges";
import SeoMeta from "@layouts/partials/SeoMeta";
import ShortIntro from "@layouts/partials/ShortIntro";
import SpecialFeatures from "@layouts/partials/SpecialFeatures";
import FreeTierCta from "@layouts/partials/FreeTierCta";
import Testimonial from "@layouts/partials/Testimonial";
import { getListPage } from "@lib/contentParser";

const Home = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, brands, features, intro, speciality, testimonial, challenges, free_tier } =
    frontmatter;
  return (
    <GSAPWrapper>
      <SeoMeta title="Innvikta | Security Awareness Training & Phishing Simulation" />
      <HomeBanner banner={banner} brands={brands} />
      <Challenges challenges={challenges} />
      <ShortIntro intro={intro} />
      <SpecialFeatures speciality={speciality} />
      <Testimonial testimonial={testimonial} />
      {free_tier?.enable && <FreeTierCta data={free_tier} />}
      <Cta />
    </GSAPWrapper>
  );
};

export default Home;
