import React, { useEffect, useState } from "react";
import { getEvents } from "../../../utils/services/EventService";
import { Link } from "react-router-dom";
import { FileCog } from "lucide-react";

const GenerateIndex = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then((res) => {
        setEvents(Array.isArray(res) ? res : []);
      })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <FileCog className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-semibold text-white">
          Generate Sertifikat
        </h1>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden bg-gray-800 border-gray-200 shadow-sm rounded-xl">
        {loading ? (
          <p className="p-5 text-center text-gray-500">Loading...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-900">
                <th className="px-5 py-3 font-semibold text-left text-white">
                  #
                </th>
                <th className="px-5 py-3 font-semibold text-left text-white">
                  Nama Event
                </th>
                <th className="px-5 py-3 font-semibold text-left text-white">
                  Tanggal Event
                </th>
                <th className="w-32 px-5 py-3 font-semibold text-center text-white">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {events.length > 0 ? (
                events.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-900" : "bg-gray-900"
                    } border-b border-gray-950 hover:bg-gray-900 transition`}
                  >
                    <td className="px-5 py-3 text-white">{index + 1}</td>

                    <td className="px-5 py-3 font-medium text-white">
                      {item.nama_event}
                    </td>

                    <td className="px-5 py-3 text-white">
                      {item.tanggal}
                    </td>

                    <td className="px-5 py-3 text-center">
                      <Link
                        to={`/admin/generate/${item.id}`}
                        className="px-3 py-1 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-5 italic text-center text-gray-900"
                  >
                    Tidak ada event tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GenerateIndex;
