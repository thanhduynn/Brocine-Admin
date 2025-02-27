"use client"
import UsefulTable from "@/components/common/UsefulTable";
import { useWorkStore } from "@/stores/work.store";
import Project from "@/types/project.type.";
import { useEffect } from "react";

const projectData: Project[] = [
  {
    "id": "101",
    "title": "Project Alpha",
    "subtitle": "A journey through innovation",
    "type": "Branding Film",
    "videoUrl": "https://example.com/alpha.mp4",
    "brand": "Tech Corp",
    "productionCompany": "Vision Films",
    "execusiveProducer": "Bob Smith",
    "director": [
      { "id": "1", "name": "Alice Johnson", "role": "Director", "imageUrl": "/images/user/user-10.jpg" }
    ]
  },
  {
    "id": "102",
    "title": "Project Beta",
    "subtitle": "Exploring the unknown",
    "type": "Event Video",
    "videoUrl": "https://example.com/beta.mp4",
    "brand": "Future Industries",
    "productionCompany": "Nova Studios",
    "execusiveProducer": "Bob Smith",
    "director": [
      { "id": "3", "name": "Charlie Davis", "role": "Director", "imageUrl": "/images/user/user-07.jpg" }
    ]
  },
  {
    "id": "103",
    "title": "Project Gamma",
    "subtitle": "Breaking boundaries",
    "type": "TVC",
    "videoUrl": "https://example.com/gamma.mp4",
    "brand": "NextGen",
    "productionCompany": "Skyline Pictures",
    "execusiveProducer": "Bob Smith",
    "director": [
      { "id": "4", "name": "Diana Lee", "role": "Director", "imageUrl": "/images/user/user-14.jpg" }
    ]
  },
  {
    "id": "104",
    "title": "Project Delta",
    "subtitle": "A vision for tomorrow",
    "type": "TVC",
    "videoUrl": "https://example.com/delta.mp4",
    "brand": "InnovateX",
    "productionCompany": "Cinematic Arts",
    "execusiveProducer": "Bob Smith",
    "director": [
      { "id": "2", "name": "Bob Smith", "role": "Executive Producer", "imageUrl": "/images/user/user-01.jpg" },
      { "id": "5", "name": "Ethan White", "role": "Director", "imageUrl": "/images/user/user-03.jpg" }
    ]
  },
  {
    "id": "105",
    "title": "REALME C75 EVERYTHING PROOF",
    "subtitle": "Built to endure with IP69 dust and water resistance. Stay powered with 6000mAh massive battery. Smart at your fingertip with advanced AI features.",
    "type": "TVC",
    "videoUrl": "https://example.com/epsilon.mp4",
    "brand": "StoryWorks",
    "productionCompany": "Luminary Studios",
    "execusiveProducer": "Bob Smith",
    "director": [
      { "id": "1", "name": "Alice Johnson", "role": "Director", "imageUrl": "/images/user/user-02.jpg" },
      { "id": "3", "name": "Charlie Davis", "role": "Director", "imageUrl": "/images/user/user-03.jpg" }
    ]
  }
];

export default function WorkWorkDetail() {
  const { setWorkStore } = useWorkStore();
  
  useEffect(() => {
    setWorkStore("projectData", projectData);
  }, [])

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Work - Work detail
        </h3>
        <div className="space-y-6">
          <UsefulTable />
        </div>
      </div>
    </div>
  );
}