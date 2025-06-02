import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { HRAnalytics } from '../../types';

interface AnalyticsPanelProps {
  analytics: HRAnalytics;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ analytics }) => {
  // Prepare data for status chart
  const statusData = Object.entries(analytics.applicationsByStatus).map(
    ([status, count]) => ({
      name: status,
      value: count,
    })
  );

  // Prepare data for department chart
  const departmentData = Object.entries(analytics.applicationsByDepartment).map(
    ([department, count]) => ({
      name: department,
      applications: count,
    })
  );

  // Colors for pie chart
  const COLORS = ['#2563EB', '#0891B2', '#F59E0B', '#10B981', '#6366F1', '#EC4899'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Application Status Distribution */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Application Status Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Applications by Department */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Applications by Department</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform Distribution */}
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Applications by Platform</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={Object.entries(analytics.applicationsByPlatform).map(
                ([platform, count]) => ({
                  name: platform,
                  applications: count,
                })
              )}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#0891B2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;