
'use server';

export async function submitContactForm(data) {
  // Simulate API delay and processing
  await new Promise(resolve => setTimeout(resolve, 1500)); 
  
  console.log("Contact form submitted:", data);
  // In a real application, you would send an email or save to a database here.
  
  // Example: Simulate a potential server-side error
  // if (data.subject.toLowerCase().includes("error")) {
  //   throw new Error("Simulated server error: Could not process the request due to subject content.");
  // }

  return { success: true, message: "Your message has been sent successfully! We'll get back to you soon." };
}
