import {
  BookOpen,
  Sparkles,
  Users,
  Layers,
  Palette,
  Share2,
} from "lucide-react";

// FeaturesSection Komponente für die Darstellung der verschiedenen Features von StoryCrafter
export function FeaturesSection() {
  return (
    <section
      id="features"
      data-test="features-section"
      className="w-full py-12 md:py-24 lg:py-32 bg-[#0f1521]"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-[#c48b3c]/10 px-3 py-1 text-sm text-[#e6a54c] shadow-glow">
              Coming Soon
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Powerful Features for Storytellers
            </h2>
            <p className="max-w-[900px] text-[#a7a7a7] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              StoryCrafter combines AI-powered tools with intuitive interfaces
              to help you create compelling narratives.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature Card: AI-Assisted Writing */}
          <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#2a3042] bg-[#131b2a]/50 p-6 backdrop-blur-sm transition-all hover:border-[#c48b3c]/30 hover:bg-[#131b2a]">
            <div className="rounded-full bg-[#c48b3c]/10 p-3">
              <Sparkles className="h-6 w-6 text-[#e6a54c]" />
            </div>
            <h3 className="text-xl font-bold">AI-Assisted Writing</h3>
            <p className="text-center text-[#a7a7a7]">
              Generate ideas and overcome writer&apos;s block with our advanced
              AI writing assistant.
            </p>
          </div>

          {/* Feature Card: Story Structure Tools */}
          <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#2a3042] bg-[#131b2a]/50 p-6 backdrop-blur-sm transition-all hover:border-[#c48b3c]/30 hover:bg-[#131b2a]">
            <div className="rounded-full bg-[#c48b3c]/10 p-3">
              <Layers className="h-6 w-6 text-[#e6a54c]" />
            </div>
            <h3 className="text-xl font-bold">Story Structure Tools</h3>
            <p className="text-center text-[#a7a7a7]">
              Organize your narrative with tools for plot development, character
              arcs, and world-building.
            </p>
          </div>

          {/* Feature Card: Character Development */}
          <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#2a3042] bg-[#131b2a]/50 p-6 backdrop-blur-sm transition-all hover:border-[#c48b3c]/30 hover:bg-[#131b2a]">
            <div className="rounded-full bg-[#c48b3c]/10 p-3">
              <Users className="h-6 w-6 text-[#e6a54c]" />
            </div>
            <h3 className="text-xl font-bold">Character Development</h3>
            <p className="text-center text-[#a7a7a7]">
              Create deep, consistent characters with detailed profiles,
              relationship maps, and dialogue generation.
            </p>
          </div>

          {/* Feature Card: Visual Inspiration */}
          <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#2a3042] bg-[#131b2a]/50 p-6 backdrop-blur-sm transition-all hover:border-[#c48b3c]/30 hover:bg-[#131b2a]">
            <div className="rounded-full bg-[#c48b3c]/10 p-3">
              <Palette className="h-6 w-6 text-[#e6a54c]" />
            </div>
            <h3 className="text-xl font-bold">Visual Inspiration</h3>
            <p className="text-center text-[#a7a7a7]">
              Generate character portraits and scene visualizations to inspire
              your creative process.
            </p>
          </div>

          {/* Feature Card: Collaboration */}
          <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#2a3042] bg-[#131b2a]/50 p-6 backdrop-blur-sm transition-all hover:border-[#c48b3c]/30 hover:bg-[#131b2a]">
            <div className="rounded-full bg-[#c48b3c]/10 p-3">
              <Share2 className="h-6 w-6 text-[#e6a54c]" />
            </div>
            <h3 className="text-xl font-bold">Collaboration</h3>
            <p className="text-center text-[#a7a7a7]">
              Work seamlessly with co-authors, editors, and team members with
              real-time collaboration features.
            </p>
          </div>

          {/* Feature Card: Export & Publishing */}
          <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#2a3042] bg-[#131b2a]/50 p-6 backdrop-blur-sm transition-all hover:border-[#c48b3c]/30 hover:bg-[#131b2a]">
            <div className="rounded-full bg-[#c48b3c]/10 p-3">
              <BookOpen className="h-6 w-6 text-[#e6a54c]" />
            </div>
            <h3 className="text-xl font-bold">Export & Publishing</h3>
            <p className="text-center text-[#a7a7a7]">
              Publish your stories to the community, where you and other users
              can play.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
