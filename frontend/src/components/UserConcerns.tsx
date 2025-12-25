// components/UserConcerns.tsx
import React, { useState, useEffect } from "react";
import { Concern, ConcernStatus } from "../types/concern";

interface UserConcernsProps {
  userEmail: string;
  onBack: () => void;
}

const UserConcerns: React.FC<UserConcernsProps> = ({ userEmail, onBack }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const IMAGE_BASE_URL = "http://localhost:8000/uploads/";

  const fetchUserConcerns = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:8000/complaint/my?email=Wishlistz@example.com`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      const concernsData = Array.isArray(data?.data) ? data.data : [];

      const mapStatus = (status: string): ConcernStatus => {
        switch (status) {
          case "submitted":
            return "New";
          case "in-progress":
            return "In-progress";
          case "resolved":
            return "Resolved";
          default:
            return "New";
        }
      };

      const formattedConcerns: Concern[] = concernsData.map((item: any) => ({
        id: item._id,
        ticketId: item.ticketId,
        name: item.name,
        email: item.email,
        orderId: item.orderId,
        category: item.category,
        description: item.description,
        status: mapStatus(item.status),
        adminNotes: "",
        screenshots:
          item.image1 || item.image2
            ? [item.image1, item.image2]
                .filter(Boolean)
                .map((img: string) => `${IMAGE_BASE_URL}${img}`)
            : [],

        createdAt: item.createdAt ? new Date(item.createdAt) : null,
        updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
      }));

      setConcerns(formattedConcerns);
    } catch (err) {
      console.error("Error fetching concerns:", err);
      setError("Failed to load your support tickets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchUserConcerns();
    }
  }, [userEmail]);

  const handleRefresh = () => {
    fetchUserConcerns();
  };

  const getStatusBadge = (status: ConcernStatus) => {
    const config = {
      New: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: "🆕" },
      "In-progress": {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: "⚙️",
      },
      Resolved: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: "✅",
      },
    };

    const badge = config[status] || {
      color: "bg-gray-100 text-gray-700 border-gray-200",
      icon: "⏳",
    };
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium ${badge.color}`}
      >
        {badge.icon} {status}
      </span>
    );
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "—";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: ConcernStatus) => {
    switch (status) {
      case "New":
        return (
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <span className="text-lg">🆕</span>
          </div>
        );
      case "In-progress":
        return (
          <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
            <span className="text-lg">⚙️</span>
          </div>
        );
      case "Resolved":
        return (
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <span className="text-lg">✅</span>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
            <span className="text-lg">📋</span>
          </div>
        );
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your support tickets...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto p-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Submit New Ticket
          </button>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Error Loading Tickets
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleRefresh}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 p-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Submit New Ticket
          </button>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Support Tickets
              </h1>
              <p className="text-gray-600">
                View and track all your submitted concerns
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </button>
              <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                <span className="text-sm text-gray-500">Email:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {userEmail}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 px-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-900">
                  {concerns.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Open</p>
                <p className="text-2xl font-bold text-gray-900">
                  {concerns.filter((c) => c.status !== "Resolved").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <span className="text-lg">📩</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {concerns.filter((c) => c.status === "In-progress").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <span className="text-lg">⚙️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {concerns.filter((c) => c.status === "Resolved").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <span className="text-lg">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        {concerns.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center mx-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No Tickets Yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't submitted any support tickets yet. Click the button
              below to create your first ticket.
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Submit Your First Ticket
            </button>
          </div>
        ) : (
          <div className="space-y-6 px-6">
            {concerns.map((concern) => (
              <div
                key={concern.id}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {getStatusIcon(concern.status)}
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">
                            {concern.ticketId}
                          </h3>
                          {getStatusBadge(concern.status)}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                          <span className="font-medium">
                            {concern.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            Submitted: {formatDate(concern.createdAt)}
                          </span>
                          {concern.orderId && (
                            <span className="flex items-center gap-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                              </svg>
                              Order: {concern.orderId}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <div className="text-sm text-gray-500 mb-1">
                        Ticket ID
                      </div>
                      <div className="font-mono font-bold text-gray-900 text-lg">
                        {concern.ticketId}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Issue Details */}
                    <div className="lg:col-span-2">
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                          Issue Description
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700 whitespace-pre-line">
                            {concern.description}
                          </p>
                        </div>
                      </div>

                      {/* Admin Notes */}
                      {concern.adminNotes && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Admin Response
                          </h4>
                          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                            <p className="text-gray-700 whitespace-pre-line">
                              {concern.adminNotes}
                            </p>
                            <div className="mt-3 pt-3 border-t border-blue-100">
                              <div className="text-xs text-blue-600">
                                Updated by Support Team
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sidebar */}
                    <div>
                      {/* Status Timeline */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                          Ticket Status
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-sm">📨</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                Ticket Created
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatDate(concern.createdAt)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                concern.status === "New"
                                  ? "bg-gray-100"
                                  : concern.status === "In-progress" ||
                                    concern.status === "Resolved"
                                  ? "bg-blue-100"
                                  : "bg-gray-100"
                              }`}
                            >
                              <span className="text-sm">👁️</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                Under Review
                              </p>
                              <p className="text-sm text-gray-500">
                                {concern.status === "New"
                                  ? "Pending"
                                  : "Being reviewed by support"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                concern.status === "Resolved"
                                  ? "bg-green-100"
                                  : concern.status === "In-progress"
                                  ? "bg-yellow-100"
                                  : "bg-gray-100"
                              }`}
                            >
                              <span className="text-sm">
                                {concern.status === "Resolved"
                                  ? "✅"
                                  : concern.status === "In-progress"
                                  ? "⚙️"
                                  : "⏳"}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {concern.status === "Resolved"
                                  ? "Resolved"
                                  : concern.status === "In-progress"
                                  ? "In Progress"
                                  : "Pending Resolution"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {concern.status === "Resolved"
                                  ? "Issue has been resolved"
                                  : concern.status === "In-progress"
                                  ? "Working on solution"
                                  : "Awaiting action"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Attachments */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                          Attachments
                        </h4>
                        <div className="space-y-2">
                          {concern.screenshots.map((screenshot, index) => (
                            <div
                              key={index}
                              onClick={() => setPreviewImage(screenshot)}
                              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                            >
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-sm">📷</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Screenshot {index + 1}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Click to view
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Need help with this ticket? Contact support@wishlistz.com
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Last updated:</span>{" "}
                      <span className="font-medium text-gray-900">
                        {formatDate(concern.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] p-4">
            <img
              src={previewImage}
              alt="Screenshot Preview"
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
            />

            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserConcerns;
