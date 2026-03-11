import { createClient } from '@supabase/supabase-js';

try {
    const supabase = createClient('', '');
    console.log("Success");
} catch (e) {
    console.log("Error caught:", e.message);
}
