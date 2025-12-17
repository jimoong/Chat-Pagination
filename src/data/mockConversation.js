// Mock conversation data for Sales Performance Analysis scenario
// Each turn contains a user message and an AI response

export const mockConversation = [
  {
    id: 1,
    user: {
      message: "Can you give me an overview of our Q4 2024 sales performance?",
    },
    ai: {
      message: "Here's your Q4 2024 sales overview. Total revenue reached $4.2M, representing a 12% increase from Q3. Let me show you the quarterly breakdown.",
      artifact: {
        type: "chart",
        chartType: "bar",
        title: "Quarterly Revenue 2024",
        data: {
          labels: ["Q1", "Q2", "Q3", "Q4"],
          datasets: [
            {
              label: "Revenue (in millions)",
              data: [3.1, 3.4, 3.75, 4.2],
              backgroundColor: "#000000",
            },
          ],
        },
      },
    },
  },
  {
    id: 2,
    user: {
      message: "That's great progress! Can you break down Q4 revenue by region?",
    },
    ai: {
      message: "Absolutely. North America continues to lead with 42% of total revenue, followed by Europe at 28%. APAC showed strong growth this quarter at 20%, while Latin America contributed 10%.",
      artifact: {
        type: "chart",
        chartType: "doughnut",
        title: "Q4 Revenue by Region",
        data: {
          labels: ["North America", "Europe", "APAC", "Latin America"],
          datasets: [
            {
              data: [1764000, 1176000, 840000, 420000],
              backgroundColor: ["#000000", "#404040", "#808080", "#b0b0b0"],
            },
          ],
        },
      },
    },
  },
  {
    id: 3,
    user: {
      message: "What were our top 10 performing products in Q4?",
    },
    ai: {
      message: "Here are the top 10 products by revenue in Q4. Enterprise Suite Pro leads with $892K, showing particularly strong adoption in the financial services sector.",
      artifact: {
        type: "table",
        title: "Top 10 Products by Revenue - Q4 2024",
        headers: ["Rank", "Product Name", "Revenue", "Units Sold", "Growth"],
        rows: [
          ["1", "Enterprise Suite Pro", "$892,000", "1,240", "+18%"],
          ["2", "Cloud Analytics Platform", "$654,000", "890", "+24%"],
          ["3", "Data Integration Hub", "$521,000", "1,450", "+15%"],
          ["4", "Security Gateway", "$445,000", "2,100", "+31%"],
          ["5", "API Management Tool", "$398,000", "1,890", "+12%"],
          ["6", "Workflow Automation", "$356,000", "980", "+8%"],
          ["7", "Mobile SDK License", "$312,000", "3,200", "+22%"],
          ["8", "Dashboard Builder", "$289,000", "1,100", "+5%"],
          ["9", "Report Generator Pro", "$267,000", "1,650", "+9%"],
          ["10", "Connector Pack", "$234,000", "2,800", "+14%"],
        ],
      },
    },
  },
  {
    id: 4,
    user: {
      message: "Show me the month-over-month revenue trend for the entire year.",
    },
    ai: {
      message: "Here's the monthly revenue trend for 2024. You can see steady growth throughout the year with a notable acceleration starting in September, likely driven by enterprise renewals and new customer acquisitions.",
      artifact: {
        type: "chart",
        chartType: "line",
        title: "Monthly Revenue Trend 2024",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Revenue ($K)",
              data: [980, 1020, 1100, 1080, 1150, 1170, 1200, 1250, 1320, 1380, 1420, 1400],
              borderColor: "#000000",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
      },
    },
  },
  {
    id: 5,
    user: {
      message: "How does our customer acquisition look? New vs returning customers?",
    },
    ai: {
      message: "Customer mix is healthy. In Q4, we acquired 342 new customers while maintaining strong retention with 1,847 returning customers. New customer revenue grew 28% compared to Q3.",
      artifact: {
        type: "chart",
        chartType: "bar",
        title: "Customer Breakdown Q4 2024",
        data: {
          labels: ["New Customers", "Returning Customers"],
          datasets: [
            {
              label: "Count",
              data: [342, 1847],
              backgroundColor: ["#000000", "#808080"],
            },
          ],
        },
        options: {
          indexAxis: 'y',
        },
      },
    },
  },
  {
    id: 6,
    user: {
      message: "What's the average deal size by customer segment?",
    },
    ai: {
      message: "Enterprise customers have the highest average deal size at $125K, which is consistent with our strategic focus. Mid-market shows good potential at $45K average, while SMB provides volume at $8.5K per deal.",
      artifact: {
        type: "table",
        title: "Average Deal Size by Segment",
        headers: ["Segment", "Avg Deal Size", "# of Deals", "Total Revenue", "YoY Change"],
        rows: [
          ["Enterprise", "$125,000", "18", "$2,250,000", "+15%"],
          ["Mid-Market", "$45,000", "32", "$1,440,000", "+22%"],
          ["SMB", "$8,500", "60", "$510,000", "+8%"],
        ],
      },
    },
  },
  {
    id: 7,
    user: {
      message: "Show me sales team performance rankings.",
    },
    ai: {
      message: "Here's the Q4 sales team leaderboard. Sarah Chen exceeded her quota by 34%, making her the top performer. The team overall achieved 108% of target.",
      artifact: {
        type: "table",
        title: "Sales Team Performance - Q4 2024",
        headers: ["Rank", "Sales Rep", "Quota", "Achieved", "% of Quota", "Deals Closed"],
        rows: [
          ["1", "Sarah Chen", "$420,000", "$562,800", "134%", "12"],
          ["2", "Michael Torres", "$380,000", "$483,600", "127%", "15"],
          ["3", "Emily Watson", "$350,000", "$423,500", "121%", "18"],
          ["4", "James Park", "$400,000", "$464,000", "116%", "11"],
          ["5", "Lisa Johnson", "$320,000", "$358,400", "112%", "14"],
          ["6", "David Kim", "$380,000", "$399,000", "105%", "9"],
          ["7", "Amanda Rivera", "$340,000", "$346,800", "102%", "13"],
          ["8", "Robert Chen", "$360,000", "$356,400", "99%", "10"],
        ],
      },
    },
  },
  {
    id: 8,
    user: {
      message: "Finally, what's our sales pipeline looking like for Q1 2025?",
    },
    ai: {
      message: "The Q1 2025 pipeline is strong at $6.8M total value. We have $2.1M in late-stage negotiations expected to close in January. Based on historical conversion rates, we're forecasting $4.5M in Q1 revenue.",
      artifact: {
        type: "chart",
        chartType: "bar",
        title: "Q1 2025 Sales Pipeline by Stage",
        data: {
          labels: ["Lead", "Qualified", "Proposal", "Negotiation", "Closing"],
          datasets: [
            {
              label: "Pipeline Value ($K)",
              data: [1200, 1800, 1500, 1400, 900],
              backgroundColor: ["#e0e0e0", "#b0b0b0", "#808080", "#404040", "#000000"],
            },
          ],
        },
      },
    },
  },
];

export default mockConversation;

