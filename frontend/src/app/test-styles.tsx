'use client'

export default function TestStyles() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Tailwind Test
      </h1>
      <div className="bg-red-500 text-white p-4 rounded-lg">
        This should be red with white text
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Button Test
      </button>
    </div>
  )
}
