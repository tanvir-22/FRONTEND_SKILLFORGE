import { Hero } from "@/components/home/Hero";
import { CourseCategories } from "@/components/home/CourseCategories";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { AIFeatures } from "@/components/home/AIFeatures";
import { PopularInstructors } from "@/components/home/PopularInstructors";
import { Statistics } from "@/components/home/Statistics";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/home/FAQSection";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <CourseCategories />
      <FeaturedCourses />
      <AIFeatures />
      <PopularInstructors />
      <Statistics />
      <Testimonials />
      <FAQSection />
      <Newsletter />
    </>
  );
}
