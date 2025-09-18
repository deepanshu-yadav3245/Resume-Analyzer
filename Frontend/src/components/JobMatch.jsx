import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobMatch = ({ resumeText }) => {
  const [jobs, setJobs] = useState([]);

  console.log("🔥 ResumeText received:", resumeText); //  Log to check

  useEffect(() => {
    const fetchJobs =  () => {
      try {
        const res = await axios.post("https://resume-analyzer-backend-navy.vercel.app/api/match-jobs", {
          resumeText,
        });
        setJobs(res.data);
      } catch (err) {
        console.error("Job match error:", err);
      }
    };

    if (resumeText) fetchJobs();
  }, [resumeText]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">🔍 Matching Jobs</h2>
      {jobs.length === 0 ? (
        <p>No matching jobs found.</p>
      ) : (
        <ul>
          {jobs.map((job, index) => (
            <li key={index} className="mb-3 p-3 border rounded">
              <h3 className="font-semibold">{job.title}</h3>
              <p>Company: {job.company}</p>
              <p>Location: {job.location}</p>
              <p>Required Skills: {job.requiredSkills.join(", ")}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobMatch;
