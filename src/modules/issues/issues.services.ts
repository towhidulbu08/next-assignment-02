import { pool } from "../../db";
import type { IType } from "./issues.interfaces";

const createIssuesIntoDB = async (payload: IType, reporter_id: number) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `
    INSERT INTO issues(title, description, type, reporter_id)
    VALUES($1, $2, $3, $4)
    RETURNING *;
    `,
    [title, description, type, reporter_id],
  );
  return result;
};

const getAllIssuesFromDB = async () => {
  const result = await pool.query(`
      SELECT * FROM issues  
        `);

  const issues = result.rows;

  if (issues.length === 0) {
    return [];
  }

  const reporter_ids = issues.map((issue) => issue.reporter_id);

  const uniqueReporterIds = [...new Set(reporter_ids)];
  const placeholders = uniqueReporterIds
    .map((_, index) => `$${index + 1}`)
    .join(", ");

  const reportersResult = await pool.query(
    `
  SELECT id, name, role
  FROM users
  WHERE id IN (${placeholders})
  `,
    uniqueReporterIds,
  );

  const reporters = reportersResult.rows;

  let finalData = issues.map((issue) => {
    const reporter = reporters.find((user) => user.id === issue.reporter_id);

    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: reporter
        ? {
            id: reporter.id,
            name: reporter.name,
            role: reporter.role,
          }
        : null,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
  });

  return finalData;
};

export const issuesService = {
  createIssuesIntoDB,
  getAllIssuesFromDB,
};
