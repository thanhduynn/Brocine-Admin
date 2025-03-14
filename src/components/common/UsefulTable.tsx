import Project from "@/types/project.type.";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useWorkStore } from "@/stores/work.store";

interface UsefulTableProps {
  onSelect: (project: Project) => void;
};

const projectHeader = [
  "Project",
  "Type",
  "Brand",
  "Prod. company",
  "Exec. producer",
  "Director",
];

export default function UsefulTable({onSelect}: UsefulTableProps) {
  const { projectData } = useWorkStore();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow key="row-header">
                {projectHeader.map((colName) => (
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    key={colName}
                  >
                    {colName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {projectData.map((project) => (
                <TableRow 
                  key={project.id} 
                  onClick={() => {
                    onSelect(project);
                  }} 
                  className="hover:cursor-pointer hover:bg-slate-200 dark:hover:bg-gray-700">
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3 max-w-72">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {project.title}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {project.subtitle}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {project.type}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {project.brand}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {project.productionCompany}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {project.execusiveProducer}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex flex-col space-y-2">
                      {project.director.map((director, index) => (
                        <span key={index}>{director}</span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
