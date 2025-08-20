import React, { useEffect, useState } from "react";

const JobSuggestions = ({ skills }) => {
  const [jobs, setJobs] = useState([]);

  const fetchJoobleJobs = async () => {
    try {
      const response = await fetch("https://resume-analyzer-backend-7v08.onrender.com/jobs/jooble", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills }),
      });

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching Jooble jobs:", error);
    }
  };

  useEffect(() => {
    if (skills && skills.length > 0) {
      fetchJoobleJobs();
    }
  }, [skills]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.length === 0 ? (
        <p className="text-white/50">No jobs found from Jooble.</p>
      ) : (
        jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white text-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <h5 className="text-lg font-bold text-blue-600 mb-1">{job.title}</h5>
              <p className="text-gray-700">{job.company || "Unknown Company"}</p>
              <p className="text-sm text-blue-500 mt-1">{job.location || "Remote"}</p>
              <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                {job.snippet || "No description available."}
              </p>
            </div>

            {job.link && (
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-md transition"
              >
                Apply Now
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default JobSuggestions;
