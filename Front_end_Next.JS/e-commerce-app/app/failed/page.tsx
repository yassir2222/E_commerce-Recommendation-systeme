import { AlertTriangle } from 'lucide-react'; // Assuming you are using lucide-react for icons
import Link from 'next/link'; // Assuming you are using Next.js for the Link component

const PaymentError = () => {
  return (
    <section className="bg-gradient-to-br from-red-50 to-red-100 px-6 py-20 text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-center">
          <div className="bg-red-100 p-4 rounded-full shadow-inner">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-red-900 leading-snug">
          Oops! Payment Failed
        </h1>
        <p className="text-lg md:text-xl text-red-800 max-w-2xl mx-auto">
          Something went wrong while processing your payment. Don't worry - your order hasn't been charged.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link
            href="/checkout"
            className="inline-block px-6 py-3 rounded-full bg-red-600 text-white text-base font-medium hover:bg-red-700 transition duration-200"
          >
            Try Again
          </Link>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-full bg-black text-white text-base font-medium hover:bg-gray-800 transition duration-200"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PaymentError;