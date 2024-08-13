// pages/result/[makeId]/[year].js
import { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const fetchData = async (makeId, year) => {
  const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
  if (!res.ok) {
    throw new Error('Failed to fetch vehicle models');
  }
  return res.json();
};

export async function getStaticPaths() {
  // Fetch or generate the paths dynamically if possible
  return {
    paths: [], // Replace with actual paths
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { makeId, year } = params;
  let models = [];
  try {
    const data = await fetchData(makeId, year);
    models = data.Results;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      makeId,
      year,
      models,
    },
  };
}

export default function ResultsPage({ makeId, year, models }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1>Vehicle Models for {makeId} ({year})</h1>
        <ul>
          {models.length > 0 ? (
            models.map((model) => <li key={model.Model_Name}>{model.Model_Name}</li>)
          ) : (
            <li>No models found</li>
          )}
        </ul>
      </div>
    </Suspense>
  );
}
