function Categorybar({ handleCategoryChange, selectedCategory }) {
  return (
    <div>
      <nav className="mt-24 py-4 flex flex-wrap gap-4 justify-between px-5 font-semibold shadow-xl rounded-3xl bg-white/90 backdrop-blur-lg">
        <select
          className="border border-slate-300 rounded-full px-4 py-2 shadow-sm"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="All">All Categories</option>
          <option value="Autobiography">Autobiography</option>
          <option value="Course">Course</option>
          <option value="Noble">Noble</option>
          <option value="Story">Story</option>
          <option value="Fiction">Fiction</option>
          <option value="Programming">Programming</option>
          <option value="Self-help">Self-help</option>
        </select>

        <div className="flex flex-wrap gap-3">
          <a href="#fiction" className="text-emerald-600 hover:underline">
            Fiction
          </a>
          <a href="#autobiography" className="text-emerald-600 hover:underline">
            Autobiography
          </a>
          <a href="#course" className="text-emerald-600 hover:underline">
            Course
          </a>
          <a href="#noble" className="text-emerald-600 hover:underline">
            Noble
          </a>
          <a href="#story" className="text-emerald-600 hover:underline">
            Story
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Categorybar;