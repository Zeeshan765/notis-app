const CommitmentSection = () => {
  return (
    <>
      <div className="grid max-w-screen-lg 2xl:max-w-screen-xl xl:max-w-screen-lg  px-4 py-8 mx-auto md:px-12 lg:py-16   lg:grid-cols-12">
        <div className="col-span-12  mb-8 text-center">
          <p className="tracking-wider text-title-xsm1 md:text-title-xsm text-custom-black font-normal mt-5 px-7 ">
            <strong>Commitment to Users </strong>At Notis, we are committed to
            continuously improving our platform based on user feedback. We
            strive to provide the best possible experience for job seekers and
            renters, helping them find the right opportunities quickly and
            easily.
          </p>
          {/* <p className="tracking-wider mt-9 text-title-xsm md:text-title-sm text-custom-black font-medium px-7 ">
          Join us in transforming the way you search for jobs and rentals. With Notis, finding your next career move or home has never been easier.
          </p> */}
        </div>
        <div className="col-span-12  mb-8 text-center md:flex md:items-center md:justify-center mt-13">
          <h1 className=" text-title-xsm1 md:text-title-xsm text-custom-black font-normal ">
            Join us in transforming the way you search for jobs and rentals.
            With Notis, finding your <br /> next career move or home has never
            been easier.
          </h1>
        </div>
      </div>
    </>
  );
};

export default CommitmentSection;
