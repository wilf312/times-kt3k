// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Temporal, type ZonedDateTime } from "esm/@js-temporal/polyfill@0.4.4";
import { authors, Post } from "util/post.ts";
import { render } from "x/gfm@0.2.5/mod.ts";

export default function Post(opts: { post: Post; permalink?: boolean }) {
  const { post, permalink } = opts;
  const html = render(post.body);
  const img = `/${post.author}.jpg`;
  const name = authors[post.author] ?? post.author;
  const date = permalink ? formatDate(post.date) : smart(post.date);
  return (
    <article>
      <div class="flex gap-5 px-5">
        <div class="flex-shrink-0">
          <img class="w-10 h-10 rounded-full" src={img} />
        </div>
        <section>
          <header class="flex gap-2 text-sm">
            <span class="font-semibold">
              {name}
            </span>
            <span class="text-gray-400">
              @{post.author}・
              {permalink
                ? date
                : (
                  <a class="hover:underline" href={`/post/${post.id}`}>
                    {date}
                  </a>
                )}
            </span>
          </header>
          <main
            style="--color-accent-fg: #3b82f6; --color-canvas-default: xx"
            data-color-mode="dark"
            data-dark-theme="dark"
            class="break-all markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </section>
      </div>
      <hr class="mt-3 border-gray-700" />
    </article>
  );
}

function smart(date: ZonedDateTime): string {
  const d = date.until(Temporal.Now.zonedDateTimeISO());
  if (d.total("day") > 2) {
    console.log("hi");
    return formatDate(date);
  }
  if (d.total("day") > 1) {
    return d.round({ smallestUnit: "day" }).days + "d";
  }
  if (d.total("hour") > 1) {
    return d.round({ smallestUnit: "hour" }).hours + "h";
  }
  if (d.total("minute") > 1) {
    return d.round({ smallestUnit: "minute" }).minutes + "m";
  }
  if (d.total("second") > 1) {
    return d.round({ smallestUnit: "second" }).seconds + "s";
  }
  return "now";
}

function formatDate(date: ZonedDateTime) {
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}