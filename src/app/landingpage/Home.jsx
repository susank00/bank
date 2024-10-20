import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Banking Software</title>
        <meta name="description" content="Your secure banking software" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-blue-900 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">BankSoft</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#features" className="hover:text-gray-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-100 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to BankSoft</h2>
          <p className="text-lg mb-8">
            Your secure banking solution at your fingertips.
          </p>
          <a
            href="#contact"
            className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Secure Transactions",
                description:
                  "All your transactions are protected with the highest security standards.",
              },
              {
                title: "24/7 Support",
                description:
                  "Our customer support team is available 24/7 to assist you.",
              },
              {
                title: "Easy to Use",
                description:
                  "Our platform is designed for ease of use, making banking simple.",
              },
            ].map(({ title, description }) => (
              <div key={title} className="border rounded-lg p-4">
                <h3 className="font-bold text-xl mb-2">{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 BankSoft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
