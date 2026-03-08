import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export function getCustomData(): Record<string, Record<string, any>> {
    const filePath = path.join(process.cwd(), 'src/custom_data.csv');
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        });

        // Convert array of objects to a key-value map keyed by "Show Slug"
        const customDataMap: Record<string, Record<string, any>> = {};
        for (const record of records) {
            const typedRecord = record as Record<string, any>;
            const slug = typedRecord['Show Slug'];
            if (slug) {
                customDataMap[slug] = typedRecord;
            }
        }

        return customDataMap;
    } catch (error) {
        console.error('Error reading custom_data.csv:', error);
        return {};
    }
}
