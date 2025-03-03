import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Message from "@/types/message.type";
import { useContactStore } from "@/stores/contact.store";

interface ContactTableProps {
  onSelect: (contact: Message) => void;
};

const contactHeader = [
  "Name",
  "Email",
  "Message",
];

export default function ContactTable({onSelect}: ContactTableProps) {
  const { messages } = useContactStore();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow key="row-header">
                {contactHeader.map((colName) => (
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
              {messages.map((message) => (
                <TableRow 
                  key={message.id} 
                  onClick={() => {
                    onSelect(message);
                    console.log(message);
                  }} 
                  className="hover:cursor-pointer hover:bg-slate-200 dark:hover:bg-gray-700">
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3 max-w-72">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {message.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          via broscine.viemind.ai
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {message.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {message.message}
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
