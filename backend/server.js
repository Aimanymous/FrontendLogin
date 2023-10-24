const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = process.env.PORT || 3000;

const supabaseUrl = 'https://ujttcedgwepusmzwzoua.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'YeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqdHRjZWRnd2VwdXNtend6b3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc1MTExNTAsImV4cCI6MjAxMzA4NzE1MH0.HjkOWhzJEwZLrJ-XosyaWkpzKiHkLpdjDCiTh4vfnNY'; // Replace with your Supabase API Key
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Store the additional user information in the database
    const { data, error: profileError } = await supabase
      .from('profiles')
      .upsert([
        {
          id: user.id,
          email,
          first_name: firstName,
          last_name: lastName,
        },
      ]);

    if (profileError) {
      return res.status(400).json({ message: profileError.message });
    }

    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
