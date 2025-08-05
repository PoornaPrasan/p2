import React from "react";

const SuccessStories = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-4xl font-bold mb-4 drop-shadow-md">Success Stories</h2>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Real experiences from citizens who have used our complaint management system to improve their communities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-transform duration-300 transform hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative h-[500px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' fill='none'><defs><linearGradient id='sky' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' style='stop-color:%2387CEEB;stop-opacity:1' /><stop offset='100%' style='stop-color:%23E0F6FF;stop-opacity:1' /></linearGradient></defs><rect width='800' height='600' fill='url(%23sky)'/><rect x='0' y='450' width='800' height='150' fill='%23228B22'/><rect x='100' y='400' width='600' height='50' fill='%23696969'/><rect x='120' y='420' width='20' height='30' fill='%23FFD700'/><rect x='160' y='420' width='20' height='30' fill='%23FFD700'/><rect x='200' y='420' width='20' height='30' fill='%23FFD700'/><rect x='240' y='420' width='20' height='30' fill='%23FFD700'/><rect x='280' y='420' width='20' height='30' fill='%23FFD700'/><rect x='500' y='350' width='200' height='100' fill='%23DCDCDC'/><rect x='520' y='370' width='40' height='60' fill='%234169E1'/><rect x='580' y='370' width='40' height='60' fill='%234169E1'/><rect x='640' y='370' width='40' height='60' fill='%234169E1'/><circle cx='300' cy='200' r='40' fill='%23FFA500'/><circle cx='450' cy='150' r='25' fill='%23FFFFFF' opacity='0.8'/><circle cx='480' cy='140' r='20' fill='%23FFFFFF' opacity='0.6'/><circle cx='420' cy='160' r='15' fill='%23FFFFFF' opacity='0.4'/></svg>")` }}>
          <div className="absolute bottom-6 left-6 right-6 bg-white bg-opacity-95 p-4 rounded-xl backdrop-blur">
            <h3 className="text-indigo-600 font-semibold text-lg mb-1">Road Repair Completed</h3>
            <p className="text-slate-600 text-sm">
              Municipal engineer inspecting the newly repaired Galle Road section after citizen complaint #CR-2024-1247
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="p-8 text-slate-800">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Citizen Testimonials</h3>
            <p className="text-slate-600">Hear from community members about their positive experiences</p>
          </div>

          {/* Main Testimonial */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-200 p-5 rounded-xl border-l-4 border-indigo-600 mb-6 relative animate-fade-in">
            <p className="italic text-slate-700 mb-4">
              "I was amazed at how quickly the system worked! I reported a dangerous pothole on my street through the online portal, and within just 5 days, a repair crew had completely fixed the road. The SMS updates kept me informed throughout the entire process."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg">
                RP
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Ruwan Perera</h4>
                <p className="text-sm text-slate-500">Resident, Galle Municipal Area</p>
              </div>
            </div>
          </div>

          {/* Additional Testimonials */}
          <div className="space-y-4">
            <div className="bg-slate-100 p-4 rounded-lg border-l-4 border-slate-400">
              <p className="text-slate-700 text-sm italic mb-3">
                "The professionalism of the municipal officers was outstanding. They not only fixed our broken streetlight but also explained the maintenance schedule."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-400 text-white flex items-center justify-center font-bold text-sm">SA</div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Saman Amarasinghe</h4>
                  <p className="text-xs text-slate-500">Community Leader, Colombo District</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg border-l-4 border-slate-400">
              <p className="text-slate-700 text-sm italic mb-3">
                "Easy to use system with transparent tracking. I could see exactly when my complaint was assigned and resolved."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-400 text-white flex items-center justify-center font-bold text-sm">NF</div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Nilmini Fernando</h4>
                  <p className="text-xs text-slate-500">Resident, Kandy Municipal Council</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-col sm:flex-row gap-6 mt-6 border-t pt-6 border-slate-200">
            <div className="flex-1 text-center">
              <span className="text-3xl font-bold text-indigo-600">94%</span>
              <p className="text-sm text-slate-500 mt-1">Satisfaction Rate</p>
            </div>
            <div className="flex-1 text-center">
              <span className="text-3xl font-bold text-indigo-600">3.2</span>
              <p className="text-sm text-slate-500 mt-1">Avg. Resolution Days</p>
            </div>
            <div className="flex-1 text-center">
              <span className="text-3xl font-bold text-indigo-600">2,840</span>
              <p className="text-sm text-slate-500 mt-1">Issues Resolved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
