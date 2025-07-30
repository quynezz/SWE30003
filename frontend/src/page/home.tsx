import { Navbar } from "@/components/navbar";
import { Stats } from "@/components/Stats"
import { Feature } from "@/components/Feature";
import { Promotions } from "@/components/Promotions";
import { Services } from "@/components/Services";
import { Categories } from "@/components/Categories";
import { Feature2 } from "@/components/Feature2";
import { Health } from "@/components/Health";
import { Testimonials } from "@/components/Testimonials";
import { News} from "@/components/News"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/Hero"

export function Home() {
    return (
        <div className="max-h-screen bg-background">
            {/* Header with Navigation merged */}
            <Navbar />

            {/* Hero Section */}
            <Hero />

            {/* Stats Section */}
            <Stats />

            {/* Features */}
            <Feature />

            {/* Promotions */}
            <Promotions />

            {/* Categories */}
            <Categories />

            {/* Services */}
            <Services />

            {/* Featured Products */}
            <Feature2 />

            {/* Health Tips */}
            <Health />

            {/* Testimonials */}
            <Testimonials />

            {/* Newsletter */}
            <News />

            {/* Footer */}
            <Footer />
        </div>
    );
}
