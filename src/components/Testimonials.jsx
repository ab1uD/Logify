import React from "react";

const Testimonials = () => (
  <section id="testimonials" className="py-5 bg-light text-center">
    <div className="container">
      <h2 className="mb-4">What Our Users Say</h2>
      <div className="row g-4">
        {[
          { name: "Jane N.", text: "Logify helped alert the community when lions strayed near the village." },
          { name: "David K.", text: "Great tool for tracking animals safely without panic." },
          { name: "Ruth M.", text: "I love how easy it is to report a sighting and upload pictures!" },
        ].map((t, i) => (
          <div className="col-md-4" key={i}>
            <div className="p-4 shadow-sm rounded bg-white">
              <p className="fst-italic">“{t.text}”</p>
              <h6 className="mt-3 text-success">– {t.name}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
