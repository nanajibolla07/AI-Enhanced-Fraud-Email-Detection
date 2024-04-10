import React from 'react'

const About = () => {
  return (
    <div className='about'>
      <header className='text-center'>
        <h1>AI Enhanced Fraud Detection</h1>
      </header>
      <main className='mt-2r'>
          <section id="mission">
              <p>Here," we're committed to enhancing online security by providing users with a reliable tool to combat fraud effectively. Our mission is to offer a seamless and intuitive platform that promotes trust and transparency in digital communications.</p>
          </section>
          <section id="features">
              <h2>Key Features</h2>
              <ul>
                  <li>Effortless Analysis</li>
                  <li>Secure Authentication</li>
                  <li>Convenient Storage</li>
              </ul>
          </section>
          <section id="how-it-works">
              <h2>How It Works</h2>
              <ol>
                  <li>Homepage</li>
                  <li>Message Analysis</li>
                  <li>Authentication</li>
              </ol>
          </section>
          <section id="get-started">
              <h2>Get Started</h2>
              <p>Experience the power of AI-enhanced fraud detection today! Sign in or sign up to begin analyzing messages and enhancing your online security.</p>
          </section>
      </main>
      <footer>
          <p>&copy; 2024 "AI Enhanced Fraud Detection". All rights reserved.</p>
      </footer>
    </div>
  )
}

export default About
