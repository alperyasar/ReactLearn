export default function ContactPage() {
  return (
    <>
      <div id="contact">
        <h2>Contact Page</h2>
        <p>Welcome to the contact page!</p>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" rows="4"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
// Compare this snippet from src/pages/HelpPage.jsx:
