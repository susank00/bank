import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Banking Software</title>
        <meta name="description" content="Your secure banking software" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-300 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Welcome to BankSoft
          </h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
            Your secure banking solution at your fingertips. Experience seamless
            transactions and robust security.
          </p>
          <a
            href="/auth/register"
            className="bg-white text-blue-900 py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300 ease-in-out"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Secure Transactions",
                description:
                  "All your transactions are protected with the highest security standards.",
                icon: "🔒", // You can replace these with actual icons if needed
              },
              {
                title: "24/7 Support",
                description:
                  "Our customer support team is available 24/7 to assist you.",
                icon: "🕒",
              },
              {
                title: "Easy to Use",
                description:
                  "Our platform is designed for ease of use, making banking simple.",
                icon: "🖥️",
              },
            ].map(({ title, description, icon }) => (
              <div
                key={title}
                className="border rounded-lg p-6 bg-white shadow-md transition-transform transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-bold text-xl mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
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
