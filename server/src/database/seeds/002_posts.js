/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("posts").del();

  // Inserts seed entries
  await knex("posts").insert([
    {
      id: 1,
      title: "The Wisdom of Ancient Trees",
      content:
        "Standing beneath a thousand-year-old redwood, I'm reminded that true strength comes not from resisting change, but from adapting with grace. These gentle giants have weathered countless storms, their roots growing deeper with each challenge. In our fast-paced world, we can learn from their patient wisdom - sometimes the most powerful thing we can do is simply stand tall and let our roots grow stronger.",
      author_id: 1,
      published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      title: "Dawn's First Light: A Meditation on New Beginnings",
      content:
        "There's something magical about watching the sun rise over misty mountains. Each dawn brings a promise of renewal, a chance to start fresh. As the first golden rays pierce through the morning fog, I'm reminded that even our darkest moments are temporary. Nature teaches us that after every night comes a new day, and with it, infinite possibilities for growth and transformation.",
      author_id: 2,
      published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      title: "The Symphony of Wildflowers",
      content:
        "Walking through a meadow in full bloom, I'm struck by the incredible diversity of life. Each wildflower, though small and seemingly insignificant, plays a vital role in the ecosystem's harmony. The delicate purple lupines, the bright yellow sunflowers, the tiny white daisies - together they create a masterpiece of color and life. It reminds me that our individual contributions, no matter how small, matter in the grand tapestry of existence.",
      author_id: 1,
      published: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      title: "Rivers and the Art of Flow",
      content:
        "Watching a mountain stream navigate its way through rocks and obstacles, I'm inspired by its persistence and adaptability. The water doesn't fight against the stones in its path - instead, it finds a way around, over, or through them. It teaches us that flexibility and determination can overcome any obstacle. Like the river, we must learn to flow with life's challenges while staying true to our ultimate destination - the vast ocean of our dreams.",
      author_id: 3,
      published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      title: "The Silent Strength of Mountains",
      content:
        "Mountains stand as silent witnesses to the passage of time, their peaks reaching toward the heavens while their foundations remain rooted in the earth. They remind us that true greatness comes from a balance of ambition and humility. As I gaze upon their majestic peaks, I'm reminded that our highest aspirations should always be grounded in our deepest values.",
      author_id: 2,
      published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 6,
      title: "Seasons of the Soul",
      content:
        "Just as nature cycles through seasons, so do our lives. The vibrant growth of spring mirrors our times of new beginnings and fresh starts. Summer represents our periods of abundance and full bloom. Autumn teaches us the beauty of letting go, while winter offers us the gift of rest and reflection. Each season has its purpose, and embracing this natural rhythm brings peace to our journey.",
      author_id: 3,
      published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
