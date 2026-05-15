import { ReactNode } from "react";

interface AdminTableProps {
  headers: string[];
  children: ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
}

export default function AdminTable({ headers, children, emptyMessage = "No data found.", isEmpty = false }: AdminTableProps) {
  return (
    <div className="rounded-xl border border-[#2A2A2A] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-gold font-bold uppercase tracking-wider text-xs whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <tr>
                <td colSpan={headers.length} className="px-4 py-16 text-center text-muted">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
